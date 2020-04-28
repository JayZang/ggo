export enum CommandTypes {
    ACCOUNT_LINK = '綁定帳號',
    WORK_REPORT = '工作報告'
}

export enum WorkReportActions {
    START_EDITION = '開始編輯',
    SELECT_TASK = '任務選擇',
    COMPLETE_EDITION = '完成編輯',
    CANCEL_EDITION = '放棄編輯'
}

export enum LineOperationState {
    NONE = '無',
    WORK_REPORT_TASK_SELECTING = '選擇填寫工作報告之任務',
    WORK_REPORT_EDITING = '填寫工作報告內容'
}