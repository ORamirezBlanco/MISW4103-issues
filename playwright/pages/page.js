const { Utils } = require("./utils");

exports.Page = class Page extends Utils {

    newPageTitle = "Relojes Pages";
    newPostContent = "Relojes content";
    pathFile = './results/ghost/';
    listElements = 'li.gh-list-row.gh-posts-list-item';

    statusFilter = 'div.gh-contentfilter-menu.gh-contentfilter-type';
    
    waitTime = 500;

    constructor(page) {
        super(page);
        this.page = page;
        this.pagesLink = page.getByRole('link', { name: 'Pages' });
        this.pageNew = page.locator('a:has-text("New page")');
        this.pageTitle = page.locator('[placeholder="Page Title"]');
        this.pageTitleConfirm = page.locator('css=div.koenig-editor__editor.__mobiledoc-editor.__has-no-content');
        this.pagesBack = page.locator('a:has-text("Pages")');       

this.pagePageFilter = page.locator(this.statusFilter);
this.pagePageFilterDraft = page.getByText('Draft pages');

this.pagePublishButton = page.getByRole('button', { name: 'Publish' });
this.pagePublishConfirm = page.getByRole('button', { name: 'Publish', exact: true });
               

this.pagePageFilterPublished = page.getByRole('option', { name: 'Published pages', exact: true });
// this.pagePageFilterPublished = page.getByText('Published pages');

this.pagePageScheduleCheck = page.locator('div:nth-child(2) > .gh-publishmenu-radio-button');
this.pagePageScheduleConfirm = page.getByRole('button', { name: 'Schedule', exact: true });
                
this.pagePageFilterScheduled = page.getByText('Scheduled pages');



        
        
        this.pagePostFilterAll = page.getByText('All posts', { exact: true });
        

        

        
        
        this.postSettingsButton = page.getByRole('button', { name: 'Settings' });
        this.postSettingsDeleteButton = page.getByRole('button', { name: 'Delete post' });
        this.postSettingsConfirmButton = page.getByRole('button', { name: 'Delete', exact: true });
        this.postSettingsCancelButton = page.getByRole('button', { name: 'Cancel' });

        this.postUpdateButton =   page.getByRole('button', { name: 'Update' });
        this.postUpdateUnPublishOption = page.locator('.gh-publishmenu-radio-button');
        this.postUpdateUnPublishConfirm = page.getByRole('button', { name: 'Unpublish', exact: true });
        
        this.postScheduledButton = page.getByRole('button', { name: 'Scheduled' });
        this.postUnPublishConfirm = page.getByRole('button', { name: 'Unschedule', exact: true });


        
    }

     async draftPage( ) {
         await this.waitPlease(this.waitTime);
         await this.pagePageFilter.click();
         await this.waitPlease(this.waitTime);
         await this.pagePageFilterDraft.click();
         await this.waitPlease(this.waitTime);
         return await this.page.$$(this.listElements);
     }

     async publishedPages( ) {
         await this.waitPlease(this.waitTime);
         await this.pagePageFilter.click();
         await this.waitPlease(this.waitTime);
         await this.pagePageFilterPublished.click();
         await this.waitPlease(this.waitTime);
         return await this.page.$$(this.listElements);
     }

     async scheduledPages( ) {
         await this.waitPlease(this.waitTime);
         await this.pagePageFilter.click();
         await this.waitPlease(this.waitTime);
         await this.pagePageFilterScheduled.click();
         await this.waitPlease(this.waitTime);
         return await this.page.$$(this.listElements);
     }

    // async selectAllPosts(){
    //     await this.waitPlease(this.waitTime);
    //     await this.pagePostFilter.click()
    //     await this.waitPlease(this.waitTime);
    //     await this.pagePostFilterAll.click();
    // }

}