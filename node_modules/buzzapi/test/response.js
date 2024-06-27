export default {
  sync: {
    api_result_data: { success: true },
  },
  syncError: {
    api_error_info: { success: false },
  },
  asyn: {
    api_result_data: "ABC123",
    api_app_ticket: "XYZ789",
  },
  asyncSuccess: {
    api_result_data: {
      api_request_messageid: "ABC123",
      api_result_data: { success: true },
    },
  },
  asyncNotReady: {
    api_result_data: {},
  },
  asyncEmpty: {
    api_result_data: {
      api_result_data: {},
    },
  },
  asyncError: {
    api_result_data: {
      api_request_messageid: "ABC123",
      api_error_info: { success: false },
    },
  },
  page1: {
    api_paging_next_cursor: "PAGE2",
    api_result_is_last_page: false,
    api_result_data: ["foo"],
  },
  page2: {
    api_result_is_last_page: true,
    api_result_data: ["bar"],
  },
  page1a: {
    api_result_data: {
      api_request_messageid: "ABC123",
      api_paging_next_cursor: "PAGE2",
      api_result_is_last_page: false,
      api_result_data: ["foo"],
    },
  },
  page2a: {
    api_result_data: {
      api_request_messageid: "ABC123",
      api_result_is_last_page: true,
      api_result_data: ["bar"],
    },
  },
};
