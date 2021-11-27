import { Approval } from "@mui/icons-material";
import { Welcome, Users, Apply, Proposal, ViewProposal } from '../pages';

export const routes = [
    {
        key: 'dashboard',
        name: 'Dashboard',
        path: '/main/home',
        component: () => (<Welcome/>),
        role: '1', //admin
    },
    {
        key: 'user',
        name: 'Users',
        path: '/main/users',
        component: () => (<Users/>),
        role: '1', //admin
    },
    {
        key: 'apply',
        name: 'Apply',
        path: '/main/apply',
        component: () => (<Apply/>),
        role: '3' //user
    },
    {
        key: 'proposal',
        name: 'Proposal',
        path: '/main/proposal',
        component: () => (<Proposal/>),
        role: '1' //admin
    },
    {
        key: 'viewproposal',
        name: 'ViewProposal',
        path: '/main/viewproposal',
        component: () => (<ViewProposal/>),
        role: '3' //user
    }
]