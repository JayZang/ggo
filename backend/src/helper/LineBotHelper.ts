import { LineOperationState } from "@/contract/line"

export class LineBotHelper {
    static async checkOperationState(userId: string, state: string): Promise<boolean> {
        return await this.getOperationState(userId )=== state
    }

    static async getOperationState(userId: string): Promise<string | null> {
        return LineOperationState.NONE
    }

    static async setOperationState(userId: string, state: string) {

    }
}