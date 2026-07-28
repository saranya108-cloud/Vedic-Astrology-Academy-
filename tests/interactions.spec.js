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

test('Karka through Makara show traditional natural-zodiac house associations', async ({ page }) => {
    const expected = [
        { sans: 'Karka', house: 4, ruler: 'Moon', snippet: 'home, mother, emotional foundations' },
        { sans: 'Simha', house: 5, ruler: 'Sun', snippet: 'children, creativity, the arts, romance' },
        { sans: 'Kanya', house: 6, ruler: 'Mercury', snippet: 'health, digestion, daily work' },
        { sans: 'Tula', house: 7, ruler: 'Venus', snippet: 'relationships, marriage, the spouse' },
        { sans: 'Vrischika', house: 8, ruler: 'Mars', snippet: "other people’s money" },
        { sans: 'Dhanu', house: 9, ruler: 'Jupiter', snippet: 'spirituality, dharma, higher learning' },
        { sans: 'Makara', house: 10, ruler: 'Saturn', snippet: 'career, public responsibility, authority' }
    ];

    for (const { sans, house, ruler, snippet } of expected) {
        await page.locator('#chartGrid .cell', { hasText: sans }).click();
        const lesson = page.locator('#lessonText');
        await expect(lesson).toContainText(`Sign: ${sans}`);
        await expect(lesson).toContainText(`Traditional House Association: ${house}`);
        await expect(lesson).toContainText(`Ruler: ${ruler}`);
        await expect(lesson).toContainText(snippet);
    }
});

test('Mesha through Mithuna, Kumbha, and Meena show complete traditional house lessons', async ({ page }) => {
    const expected = [
        {
            sans: 'Mesha',
            english: 'Aries',
            house: 1,
            ruler: 'Mars',
            description: 'The 1st house is associated with the self, body, personality, appearance, vitality, and overall life direction.'
        },
        {
            sans: 'Vrishabha',
            english: 'Taurus',
            house: 2,
            ruler: 'Venus',
            description: 'The 2nd house is associated with wealth, speech, family, food, values, and accumulated resources.'
        },
        {
            sans: 'Mithuna',
            english: 'Gemini',
            house: 3,
            ruler: 'Mercury',
            description: 'The 3rd house is associated with courage, younger siblings, communication, skills, writing, and self-effort.'
        },
        {
            sans: 'Kumbha',
            english: 'Aquarius',
            house: 11,
            ruler: 'Saturn',
            description: 'The 11th house is associated with gains, income, fulfillment of desires, friends, networks, community, and group activities.'
        },
        {
            sans: 'Meena',
            english: 'Pisces',
            house: 12,
            ruler: 'Jupiter',
            description: 'The 12th house is associated with expenses, loss, foreign lands, seclusion, sleep, spiritual release, and moksha.'
        }
    ];

    for (const { sans, english, house, ruler, description } of expected) {
        await page.locator('#chartGrid .cell', { has: page.locator('.sign-label', { hasText: sans }) }).click();
        const lesson = page.locator('#lessonText');
        await expect(lesson).toContainText(`Sign: ${sans} (${english})`);
        await expect(lesson).toContainText(`Traditional House Association: ${house}`);
        await expect(lesson).toContainText(`Ruler: ${ruler}`);
        await expect(lesson).toContainText(description);
    }
});

test('natural zodiac reference chart has no Ascendant or Sun markers and keeps Mithuna top-right', async ({ page }) => {
    await expect(page.locator('#chartGrid')).toContainText('South Indian Rashi Chart');
    await expect(page.locator('#chartGrid')).toContainText('Natural Zodiac Reference');
    await expect(page.locator('#chartGrid')).not.toContainText('AS (L)');
    await expect(page.locator('#chartGrid')).not.toContainText('Lagna in Vrishabha');
    await expect(page.locator('#chartGrid .planet-tag')).toHaveCount(0);

    const topRightSign = await page.evaluate(() => {
        const cells = [...document.querySelectorAll('#chartGrid .cell')];
        const tops = cells.map((cell) => cell.getBoundingClientRect().top);
        const minTop = Math.min(...tops);
        const topRow = cells.filter((cell) => Math.abs(cell.getBoundingClientRect().top - minTop) < 2);
        topRow.sort((a, b) => b.getBoundingClientRect().left - a.getBoundingClientRect().left);
        return topRow[0].querySelector('.sign-label').textContent.trim();
    });
    expect(topRightSign).toBe('Mithuna');
});

test('all chart cells are operable with mouse, Enter, and Space without console errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(String(err)));

    const cells = page.locator('#chartGrid .cell');
    await expect(cells).toHaveCount(12);

    for (let index = 0; index < 12; index++) {
        const cell = cells.nth(index);
        const sign = await cell.locator('.sign-label').innerText();

        await cell.click();
        await expect(page.locator('#lessonText')).toContainText(`Sign: ${sign}`);
        await expect(page.locator('#lessonText')).toContainText('Traditional House Association:');
        await expect(page.locator('#lessonText')).toContainText('Ruler:');

        await cell.focus();
        await cell.press('Enter');
        await expect(page.locator('#lessonText')).toContainText(`Sign: ${sign}`);

        await cell.focus();
        await cell.press('Space');
        await expect(page.locator('#lessonText')).toContainText(`Sign: ${sign}`);
    }

    expect(consoleErrors).toEqual([]);
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
