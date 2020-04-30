export enum CommandTypes {
    ACCOUNT_LINK = '綁定帳號',
    WORK_REPORT = '工作報告'
}

export enum WorkReportActions {
    START_EDITION = '開始編輯',
    SELECT_TASK = '任務選擇',
    COMPLETE_EDITION = '完成編輯',
    CONFIRM_EDITION = '確認編輯',
    CANCEL_EDITION = '放棄編輯'
}

export enum LineOperationState {
    NONE = '無',
    WORK_REPORT_TASK_SELECTING = '選擇填寫工作報告之任務',
    WORK_REPORT_TITLE_EDITING = '輸入工作報告標題',
    WORK_REPORT_CONTENT_EDITING = '輸入工作報告內容',
    WORK_REPORT_START_TIME_EDITING = '輸入工作報告之工作起始時間',
    WORK_REPORT_END_TIME_EDITING = '輸入工作報告之工作完成時間',
    WORK_REPORT_CONFIRM = '確認工作報告填寫內容'
}