/**
 *
 * 引入mockjs，生成模拟数据
 * 涉及逻辑时，硬编码假数据无法满足
 *
 */
const Mock = require("mockjs");
const Random = Mock.Random;

const mockApis = {
  "/module1/cover": Mock.mock({
    code: 200,
    data: {
      uid: "582028",
      username: "sufaith",
      phone: "12345678910",
    },
  }),
  "/module1/add": Mock.mock({
    code: 200,
    data: {
      uid: "582028",
      username: "sufaith",
      phone: "12345678910",
    },
  }),
  "/module1/more/test": Mock.mock({
    code: 200,
    data: {
      uid: "582028",
      username: "sufaith",
      phone: "12345678910",
    },
  }),
};

module.exports = mockApis;
