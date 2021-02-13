// Layouts
import LayoutBasic from '../layouts/LayoutBasic';

// Pages
import Home from '../pages/Home';
import User from '../pages/User';
import Error404 from '../pages/Error404';

const routes = [
    {
        path: "/",
        layout: LayoutBasic,
        component: Home,
        exact: true // exact true == /user
    },
    {
        path: "/:username",
        layout: LayoutBasic,
        component: User,
        exact: true // exact true == /user | exact false == /userssss (si exact = true entonces permite solo la ruta especificada, sino permite todo lo demás)
    },
    {
        layout: LayoutBasic,
        component: Error404, // si encuentra la raiz / me renderiza Home, si encuentra /user me renderiza User, sino, la página 404
    },
];

export default routes;