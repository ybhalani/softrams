import { CommonMethodBaseClass } from './common-method';

describe('CommonMethodBaseClass', () => {
    let commonMethod: CommonMethodBaseClass;

    describe('showAlert', () => {
        it('should set alertType is success when showAlert is invoked with success', () => {
            commonMethod = new CommonMethodBaseClass();
            commonMethod.showAlert('success', 'message');
            expect(commonMethod.alertType).toEqual('success');
        });

        it('should set alertType is danger when showAlert is invoked with danger', () => {
            commonMethod = new CommonMethodBaseClass();
            commonMethod.showAlert('danger', 'error');
            expect(commonMethod.alertType).toEqual('danger');
        });
    });

    describe('hideAlert', () => {
        it('should set alertType is bull when hideAlert is invoked', () => {
            commonMethod = new CommonMethodBaseClass();
            commonMethod.hideAlert();
            expect(commonMethod.alertType).toEqual(null);
        });

    });
});

