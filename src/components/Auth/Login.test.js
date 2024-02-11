import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('test login',()=>{

    test('renders email label', () => {
        render(<Login />);
        const emailLabelElement = screen.getByText(/Email Address/i,{exact:false});
        expect(emailLabelElement).toBeInTheDocument();
      });

      test('renders password label', () => {
        render(<Login />);
        const passwordLabelElement = screen.getByText(/Password/,{exact:false});
        expect(passwordLabelElement).toBeInTheDocument();
      });

      test('renders confirm password label', () => {
        render(<Login />);
        const confirmPasswordElement = screen.getByText(/Confirm Password/);
        expect(confirmPasswordElement).toBeInTheDocument();
      });

})

