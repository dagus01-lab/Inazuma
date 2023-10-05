import { useState } from "react";

export const useTogglePasswordVisibility_other = () => {
    const [passwordVisibility_other, setPasswordVisibility_other] = useState(true);
    const [rightIcon_other, setRightIcon_other] = useState('eye');
    
    const handlePasswordVisibility_other = () => {

        if (rightIcon_other === 'eye') {
    
          setRightIcon_other('eye-off');
    
          setPasswordVisibility_other(!passwordVisibility_other);
    
        } else if (rightIcon_other === 'eye-off') {
    
          setRightIcon_other('eye');
    
          setPasswordVisibility_other(!passwordVisibility_other);
    
        }
    
      };
    
    
      return {
    
        passwordVisibility_other,
    
        rightIcon_other,
    
        handlePasswordVisibility_other
    
      };
  };