import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'newsfeed',
        loadChildren: 'app/newsfeed/newsfeed.module#NewsfeedModule',
        data: { animation: 'newsfeed' }
    },
    {
        path: 'collection',
        loadChildren: 'app/collection/collection.module#CollectionModule',
        data: { animation: 'newsfeed' }
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
