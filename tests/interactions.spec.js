const path = require('path');
const { pathToFileURL } = require('url');
const { test, expect } = require('@playwright/test');

const appUrl = pathToFileURL(path.resolve(__dirname, '..', 'index.html')).href;
const panelIds = ['studyMode', 'moduleMode', 'guideMode', 'yogaMode', 'yogaQuizMode', 'quizMode'];
const inactivePanels = ['moduleMode', 'guideMode', 'yogaMode', 'yogaQuizMode', 'quizMode'];

test.beforeEach(async ({ page }) => {
    await page.goto(appUrl);
});

test('all chart cells update the lesson', async ({ page }) => {
    const cells = page.locator('#chartGrid .cell');
    await expect(cells).toHaveCount(12);

    for (let index = 0; index < 12; index++) {
        const cell = cells.nth(index);
        const sign = await cell.locator('.sign-label').innerText();
        await cell.click();
        await expect(page.locator('#lessonText')).toContainText(`Sign: ${sign}`);
    }
});

test('chart selection restores visible study feedback from every view', async ({ page }) => {
    const entries = [
        'button.btn-nak',
        'button.btn-yoga',
        'button.btn-graha',
        'text=Start Nakshatra Quiz',
        'text=Start Yoga Quiz'
    ];

    for (const entry of entries) {
        await page.goto(appUrl);
        await page.click(entry);
        await page.locator('#chartGrid .cell').first().click();

        await expect(page.locator('#studyMode')).toBeVisible();
        await expect(page.locator('#lessonText')).toContainText('Sign: Meena');
        for (const panelId of inactivePanels) {
            await expect(page.locator(`#${panelId}`)).toBeHidden();
        }
    }
});

test('navigation keeps exactly one panel visible', async ({ page }) => {
    const entries = [
        { button: 'text=Explore the 27 Nakshatras', panel: 'guideMode' },
        { button: 'text=Explore Planetary Yogas', panel: 'yogaMode' },
        { button: 'text=Explore the Grahas', panel: 'moduleMode' },
        { button: 'text=Explore the Dasha System', panel: 'moduleMode' },
        { button: 'text=Explore the Bhavas', panel: 'moduleMode' },
        { button: 'text=Explore Drishti', panel: 'moduleMode' },
        { button: 'text=Start Nakshatra Quiz', panel: 'quizMode' },
        { button: 'text=Start Yoga Quiz', panel: 'yogaQuizMode' }
    ];

    for (const entry of entries) {
        await page.goto(appUrl);
        await page.click(entry.button);
        expect(await page.evaluate(ids =>
            ids.filter(id => !document.getElementById(id).classList.contains('hidden')), panelIds
        )).toEqual([entry.panel]);

        await page.locator(`#${entry.panel}`).getByText('Back to Study').click();
        expect(await page.evaluate(ids =>
            ids.filter(id => !document.getElementById(id).classList.contains('hidden')), panelIds
        )).toEqual(['studyMode']);
    }
});

test('both quizzes reveal an in-view continuation control on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const quizzes = [
        {
            start: 'text=Start Nakshatra Quiz',
            option: '#optionsContainer .quiz-option',
            next: '#nakNextBtn'
        },
        {
            start: 'text=Start Yoga Quiz',
            option: '#yogaOptionsContainer .quiz-option',
            next: '#yogaNextBtn'
        }
    ];

    for (const quiz of quizzes) {
        await page.goto(appUrl);
        await page.click(quiz.start);
        await page.locator(quiz.option).first().click();

        const nextButton = page.locator(quiz.next);
        await expect(nextButton).toBeVisible();
        await expect(nextButton).toBeFocused();
        expect(await nextButton.evaluate(element => {
            const rect = element.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight;
        })).toBe(true);
    }
});

test('a question can only be scored once', async ({ page }) => {
    await page.click('text=Start Nakshatra Quiz');
    await page.locator('#optionsContainer .quiz-option').first().evaluate(option => {
        option.onclick();
        option.onclick();
    });

    await expect(page.locator('#nakScoreText')).toContainText('/ 1');
});

test('question selection terminates with deterministic randomness', async ({ page }) => {
    await page.addInitScript(() => {
        Math.random = () => 0;
    });
    await page.goto(appUrl);
    await page.click('text=Start Nakshatra Quiz');

    const questions = [];
    for (let index = 0; index < 5; index++) {
        questions.push(await page.locator('#questionText').innerText());
        await page.locator('#optionsContainer .quiz-option').first().click();
        await page.locator('#nakNextBtn').click();
    }

    for (let index = 1; index < questions.length; index++) {
        expect(questions[index]).not.toBe(questions[index - 1]);
    }
});

test('quiz completes after ten questions and presents a final score', async ({ page }) => {
    await page.click('text=Start Nakshatra Quiz');

    for (let index = 0; index < 10; index++) {
        await page.locator('#optionsContainer .quiz-option').first().click();
        if (index < 9) {
            await page.locator('#nakNextBtn').click();
        }
    }

    await expect(page.locator('#nakNextBtn')).toHaveText('View Results ➜');
    await page.locator('#nakNextBtn').click();
    await expect(page.locator('#questionText')).toHaveText('Quiz complete!');
    await expect(page.locator('#nakScoreText')).toContainText('Final Score:');
    await expect(page.locator('#nakFeedback')).toContainText('Select Back to Study');
});
