const { Page341 } = require("../3.41/page");

exports.Page444 = class Page344 extends Page341 {



    constructor(page) {
        super(page);
        this.pageTitle = page.locator('[placeholder="Page title"]');
   
        this.pagePublishConfirmReady  = page.locator('button:has-text("Publish")'); 
        this.pagePublishScheduleConfirmReady = page.locator('button:has-text("Schedule")'); 
    
    }

    async publishPage(esc, i) {
        await this.pagePublishButton.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-page_crear_publish_menu.png');

        await this.pagePublishConfirm.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i) + '-page_crear_publish_confirm.png');

        await this.pagePublishConfirmReady.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-page_crear_publish_confirm_2_ready.png');
    }

    async schedulePost(esc, i) {
        await this.pagePublishButton.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-page_crear_publish_menu.png');

        await this.pagePageScheduleCheck.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-page_crear_publish_schedule_select.png');

        await this.pagePageScheduleConfirm.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i) + '-page_crear_publish_schedule_confirm.png');
    
        await this.pagePublishScheduleConfirmReady.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-page_crear_publish_schedule_confirm_2_ready.png');
   }

}