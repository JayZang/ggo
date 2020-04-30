import { Message } from "@line/bot-sdk";
import getNormalTemplateMessage from "./getNormalTemplateMessage";

export default function (): Message | Message[] {
    return getNormalTemplateMessage('系統錯誤，非常抱歉請重新操作')
}