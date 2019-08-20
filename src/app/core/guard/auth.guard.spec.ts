import { AuthGuard } from './auth.guard';

class MockRouter {
    navigate(path) { }
}

describe('AuthGuard', () => {
    describe('canActivate', () => {
        let authGuard: AuthGuard;
        let router;

        it('should return true for a logged in user', () => {
            localStorage.setItem('username', 'testuser');
            router = new MockRouter();
            authGuard = new AuthGuard(router);

            expect(authGuard.canActivate()).toEqual(true);
        });

        it('should navigate to login for a logged out user', () => {
            localStorage.removeItem('username');
            router = new MockRouter();
            spyOn(router, 'navigate');
            authGuard = new AuthGuard(router);

            expect(authGuard.canActivate()).toEqual(false);
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
        });
    });
});

