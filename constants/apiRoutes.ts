export default {
    GET_ISSUES: "/api/issues",
    GET_ISSUE: (id: number) => `/api/issues/${id}`,
    POST_ISSUE: "/api/issues",
    PUT_ISSUE: (id: number) => `/api/issues/${id}`
}