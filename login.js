const { sleep, setWaitTimeout, waitForElement } = require('wd/lib/commands');
const { remote } = require('webdriverio');

async function runLogin() {

    const capabilities = {
        platformName: 'Android',
        'appium:platformVersion': '13.0',
        'appium:automationName': 'Appium',
        'appium:app': '/Users/davekim/Developments/seoltab/build/app/outputs/flutter-apk/app-prod-release.apk',
        'appium:deviceName': '1B826283-8FE6-4935-A10B-21940929D488',
        'appium:ensureWebviewsHavePages': true,
        'appium:nativeWebScreenshot': true,
        'appium:newCommandTimeout': 3600,
        'appium:connectHardwareKeyboard': true,
        'appium:autoGrantPermissions': true,
    }

    const driver = await remote({
        protocol: 'http',
        hostname: '127.0.0.1',
        port: 4723,
        path: '/wd/hub',
        capabilities: capabilities,
    })

    try {
        // 로그인
        // await driver.waitForElement("xpath://android.view.View[@content-desc=\"이메일\n비밀번호\"]".isDisplayed, 10000, 100);
        const log_Id = await driver.$("xpath://android.view.View[@content-desc=\"이메일\n비밀번호\"]");
        await log_Id.waitForDisplayed();
        await log_Id.click();
        await log_Id.addValue("jaden_s1@seoltab.test"); // 로그인 아이디 입력
        const log_Pw = await driver.$("xpath://android.view.View[@content-desc=\"이메일\n비밀번호\"]/android.widget.EditText[2]");
        await log_Pw.click();
        await log_Pw.addValue("asdfasdf"); // 로그인 패스워드 입력
        const log_Btn = await driver.$("accessibility id:로그인");
        await log_Btn.click(); // 로그인 버튼 클릭

        // 튜토리얼 컨트롤
        console.log('튜토리얼을 제어 합니다.')
        let count = 0;
        while (count < 10) {
            await browser.touchAction([
                { action: 'press', x: 700, y: 150 },
                { action: 'release' }
            ]);
        }

        // 로그아웃
        const gnb_Mypage = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ImageView");
        await gnb_Mypage.click(); // GNB 마이페이지 버튼 클릭
        const mypage_logOut = await driver.$("id:com.seoltab.seoltab:id/tvLogout");
        await mypage_logOut.click(); // 마이페이지 내 로그아웃 버튼 클릭
        const logoutChk = document.getElementById("//android.view.View[@content-desc=\"로그인\"]")
        const chktext = ('로그인');
        if (chktext == logoutChk) {
            console.log('로그아웃 되었습니다.')
        }

    } finally {
        await driver.pause(1000);
        console.log('로그인/로그아웃 테스트가 완료되었습니다.')
        await driver.deleteSession();
    }
};

runLogin().catch(console.error);