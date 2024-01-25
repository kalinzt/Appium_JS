const wd = require('wd');

const appiumServer = 'http://localhost:4723/wd/hub';

const seoltabAppPackage = 'com.seoltab.seoltab';
const seoltabAppActivity = 'com.seoltab.seoltab.MainActivity';
echo "# Appium_JS" >> README.md
const desiredCaps = {
    platformName: 'Android',
    deviceName: 'R54W104V3QY',
    appPackage: seoltabAppPackage,
    appActivity: seoltabAppActivity,
    ensureWebviewsHavePages: true,
    nativeWebScreenshot: true,
    newCommandTimeout: 3600,
    connectHardwareKeyboard: true,
    autoGrantPermissions: true
};

const driver = wd.promiseChainRemote(appiumServer);
const wait = wd.promiseWebdriver.promise.waitForElement;

const findById = (id) => driver.elementById(id);
const findByXPath = (xpath) => driver.elementByXPath(xpath);
const findByAccessibilityId = (accessibilityId) => driver.elementByAccessibilityId(accessibilityId);

const testId = 'jaden_s1@seoltab.test';
const testPw = 'asdfasdf';

(async () => {
    console.log('로그인/로그아웃 테스트를 시작합니다.');
    console.log('테스트 계정 =', testId);

    // 로그인
    await wait(findByAccessibilityId('로그인'), 20000);
    const logText = await findByAccessibilityId('로그인');
    const chckText = await logText.text();
    console.log(chckText, '페이지에 정상 접속하였습니다.');

    const logId = await findByXPath('//android.view.View[@content-desc="이메일\n비밀번호"]/android.widget.EditText[1]');
    await logId.click();
    await logId.sendKeys(testId);

    const logPw = await findByXPath('//android.view.View[@content-desc="이메일\n비밀번호"]/android.widget.EditText[2]');
    await logPw.click();
    await logPw.sendKeys(testPw);

    await findByAccessibilityId('로그인').click();

    // 튜토리얼 컨트롤
    await wait(findByXPath('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ImageView'), 20000);
    console.log('로그인이 정상적으로 완료 되었습니다.');

    const tutorialElemValues = ['1', '2', '3'];

    try {
        for (const tutorialElemValue of tutorialElemValues) {
            const tutorialElem = await findById(tutorialElemValue);
            const isTutorialExist = await tutorialElem.isDisplayed();
            if (!isTutorialExist) {
                throw new Error();
            }
            await driver.execute('mobile: tap', { x: 750, y: 130 });
            console.log('과외 튜토리얼 확인');
        }
    } catch (error) {
        console.error('error');
    }

    // 로그아웃
    const gnbMy = await findByXPath('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ImageView');
    await gnbMy.click();

    await wait(findById('com.seoltab.seoltab:id/tvLogout'), 20000);
    const myLogout = await findById('com.seoltab.seoltab:id/tvLogout');
    await myLogout.click();

    await wait(findByAccessibilityId('로그인'), 20000);
    const logTextLogout = await findByAccessibilityId('로그인');
    const chckTextLogout = await logTextLogout.text();
    console.log('정상적으로 로그아웃 하여', chckTextLogout, '페이지로 이동 하였습니다.');
    console.log('로그인/로그아웃 테스트 완료');

    await driver.quit();

    console.log('OK. bye~');
})();

const el1 = await driver.$("xpath://android.view.View[@content-desc=\"이메일\n비밀번호\"]/android.widget.EditText[1]");
await el1.click();
await el1.addValue("jaden_s1@seoltab.test");
const el2 = await driver.$("xpath://android.view.View[@content-desc=\"이메일\n비밀번호\"]/android.widget.EditText[2]");
await el2.click();
await el2.addValue("asdfasdf");
const el3 = await driver.$("accessibility id:로그인");
await el3.click();
const el4 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View");
await el4.click();
await el4.click();
await el4.click();
await el4.click();
await el4.click();
await el4.click();
await el4.click();
const el5 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ImageView");
await el5.click();
const el6 = await driver.$("id:com.seoltab.seoltab:id/tvLogout");
await el6.click();