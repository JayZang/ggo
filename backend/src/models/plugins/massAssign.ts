import { Schema } from "mongoose";

export default (schema: Schema) => {
  schema.method('massAssign', function(data: any) {
    let validData: any = {}

    Object.keys(data).forEach(key => {
      if (schema.obj[key] && 
          schema.obj[key] !== '_id' && 
          !schema.obj[key].protected)
        validData[key] = data[key]
    })

    Object.assign(this, validData)
  })
}