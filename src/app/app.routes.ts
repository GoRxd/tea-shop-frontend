import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';
import { LoginComponent } from './pages/users/login/login/login.component';
import { RegisterComponent } from './pages/users/register/register/register.component';
import { UserProfileComponent } from './pages/users/user-profile/user-profile/user-profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products/product-list',
        pathMatch: 'full', // important for exact match
    },
    {
        path: 'products/product-list',
        component: ProductListComponent,
        title: 'Product Listing'
    },
    {
        path: 'products/:id',
        component: ProductDetailsComponent,
        title: 'Product Details'
    },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: UserProfileComponent },

];
