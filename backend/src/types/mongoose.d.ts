declare module "mongoose" {
  interface Document {
    massAssign: (data: any) => void
  }
}