const { sleep } = require('wd/lib/commands');
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
        const loginBtn = await driver.$('//android.view.View[@content-desc="로그인"]').waitForExist({ timeout: 10000, interval: 3000 });
        const log_Id = await driver.$('//android.view.View[@content-desc=\"이메일\n비밀번호\"]/android.widget.EditText[1]');
        await log_Id.click();
        await log_Id.addValue("jaden_s1@seoltab.test"); // 로그인 아이디 입력
        const log_Pw = await driver.$('//android.view.View[@content-desc=\"이메일\n비밀번호\"]/android.widget.EditText[2]');
        await log_Pw.click();
        await log_Pw.addValue("asdfasdf"); // 로그인 패스워드 입력
        const log_Btn = await driver.$("accessibility id:로그인");
        await log_Btn.click(); // 로그인 버튼 클릭

        // 튜토리얼 컨트롤
        // await browser.action('pointer', {
        //     parameters: { pointerType: 'touch' }
        // })
        // console.log('튜토리얼을 제어 합니다.')

        // let count = 0;
        // while (count < 10) {
        //     await browser.touchAction([
        //         { action: 'press', x: 700, y: 150 },
        //         { action: 'release' }
        //     ]);
        // }
        const waitMypage = await
            driver.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View')
                .waitForDisplayed(10000);
        let t = 0;
        const maxTaps = 12;
        const screen = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View');
        await screen.touchAction('tap');

        while (t <= maxTaps) {
            await screen.touchAction({ action: 'tap' });
            t++;
            await sleep(1000); // 1초 대기
        }

        // 로그아웃
        const gnb_Mypage = await driver.$('//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ImageView');
        await gnb_Mypage.click(); // GNB 마이페이지 버튼 클릭
        const mypage_logOut = await driver.$('//android.widget.TextView[@resource-id="com.seoltab.seoltab:id/tvLogout"]');
        await mypage_logOut.click(); // 마이페이지 내 로그아웃 버튼 클릭
        await sleep(3000);
        const logoutChk = await (await driver.$('//android.view.View[@content-desc=\"로그인\"]')).getTagName();
        const chktext = '로그인';
        if (chktext == logoutChk) {
            console.log('로그인 버튼이 확인 되었습니다.')
        } else console.log('로그인 버튼의 텍스트를 가져오지 못했습니다.')

    } finally {
        await driver.pause(1000);
        console.log('로그인/로그아웃 테스트가 완료되었습니다.')
        await driver.deleteSession();
    }
};

runLogin().catch(console.error);