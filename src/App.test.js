import { render, screen } from '@testing-library/react';
import Login from './components/Auth/Login';

describe('test login',()=>{

    test('renders email label', () => {
        render(<Login />);
        const emailLabelElement = screen.getByText(/Email Address/i,{exact:false});
        expect(emailLabelElement).toBeInTheDocument();
      });

})

