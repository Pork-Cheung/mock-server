/**
 *
 * 引入mockjs，生成模拟数据
 * 涉及逻辑时，硬编码假数据无法满足
 *
 */
 const Mock = require("mockjs");
 const Random = Mock.Random;
 
 const mockDb = {
   "approval_info/get_approval_result": () =>
     Mock.mock({
       code: 200,
       data: {
         admission_duration: null,
         admission_status: null,
         "approval_result|0-2": 1,
         approval_time: Random.date("yyyy-MM-dd"),
         approver: "审批人",
         company: "是打发",
         contact_type: "WeChat",
         contact_way: "WeChat：13138490330",
         dual_NIC: 0,
         high_risk_port: 0,
         "id|1-10000": 1000,
         ipaddr: "",
         match_result: 2,
         number: "13138490330",
         past_status: null,
         reject_reason: "驳回原因",
         reject_status: null,
         remarks: "啊所发生的",
         report_department_name: "发电房萨达",
         report_dev_type: "主机",
         report_ipaddr: "192.168.5.221",
         report_mac: "58:e8:76:83:a2:e1",
         report_time: "2021-11-01 09:36:23",
         reporter: "阿斯顿发",
         update_time: "2021-11-01 10:53:30",
         vulnerability: 1,
         weak_passwd: 1,
       },
     }),
   "approval_info/report": () =>
     Mock.mock({
       "code|200-201": 200,
       "data|0-1": {
         id: 1234567890,
       },
       message: "错误消息",
     }),
   "device_info/get_alarm_list": () =>
     Mock.mock({
       code: 200,
       data: {
         headers: {
           alarm_name: ["你看"],
           alarm_reason: ["新增"],
           alarm_time: ["2021-11-01 11:32:16"],
           block_result: ["已阻断"],
           block_status: ['已阻断'],
           dev_type: ["路由器"],
           id: [1],
           ipaddr: ["192.168.12.12"],
           security_domain: ["10网段"],},
         items: [
           {
             alarm_name: "你看",
             alarm_reason: "新增",
             alarm_time: "2021-11-01 11:32:16",
             block_result: "已阻断",
             block_status: "['已阻断']",
             dev_type: "路由器",
             id: 1,
             ipaddr: "192.168.12.12",
             security_domain: "10网段",
           },
           {
             alarm_name: "你看",
             alarm_reason: "新增",
             alarm_time: "2021-11-01 11:32:16",
             block_result: "已阻断",
             block_status: "['已阻断']",
             dev_type: "路由器",
             id: 1,
             ipaddr: "192.168.12.13",
             security_domain: "13网段",
           },
           {
             alarm_name: "你看",
             alarm_reason: "新增",
             alarm_time: "2021-11-01 11:32:16",
             block_result: "未阻断",
             block_status: "['未阻断']",
             dev_type: "路由器",
             id: 4,
             ipaddr: "192.168.12.14",
             security_domain: "14网段",
           },
         ],
         page: 1,
         pages: 0,
         per_page: 15,
         total: 0,
       },
       message: "请求成功",
     }),
 };
 
 module.exports = mockDb;
 