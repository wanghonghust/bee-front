import routes from "./routes";
import {createRouter, createWebHistory} from 'vue-router'
import {Session} from "../utils/storage";
// @ts-ignore
import NProgress from "nprogress"// progress bar
import 'nprogress/nprogress.css' // progress bar style

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.meta.title) {
        // @ts-ignore
        window.document.title = to.meta.title;
    }
    const token = Session.get("token")
    if (!token && to.meta.requireAuth === true && to.path !== "/login") {
        next({
            path: "/login",
            query: {redirect: to.fullPath}
        })
    } else {
        next();
        NProgress.done()
    }
})

export default router
