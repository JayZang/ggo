export const correctMemberData = {
  name: "Jay",
  phone: "0972207525",
  gender: true,
  email: "test@gmail.com",
  birthday: "2019-09-29T13:23:45.708Z"
}

export const incorrectMemberDatas = [{
  ...correctMemberData,
  name: ''
}, {
  ...correctMemberData,
  name: null
}, {
  ...correctMemberData,
  name: undefined
}, {
  ...correctMemberData,
  phone: ''
}, {
  ...correctMemberData,
  phone: null
}, {
  ...correctMemberData,
  phone: undefined
}, {
...correctMemberData,
  gender: ''
}, {
  ...correctMemberData,
  gender: null
}, {
  ...correctMemberData,
  gender: undefined
}, {
...correctMemberData,
  email: ''
}, {
  ...correctMemberData,
  email: null
}, {
  ...correctMemberData,
  email: undefined
}, {
...correctMemberData,
  birthday: ''
}, {
  ...correctMemberData,
  birthday: null
}, {
  ...correctMemberData,
  birthday: undefined
}]