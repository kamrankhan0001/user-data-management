import React, { useEffect, useState, useRef } from 'react';
import "./style.css";

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// UserDataForm component
function UserDataForm() {
    // State variables for form fields and form dirty state
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isFormDirty, setIsFormDirty] = useState(false);
    const formRef = useRef(null); // Ref for accessing the form DOM element

    // Event handlers for form fields
    function handleName(e) {
        setName(e.target.value);
        setIsFormDirty(true);
    }

    function handleAddress(e) {
        setAddress(e.target.value);
        setIsFormDirty(true);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
        setIsFormDirty(true);
    }

    function handlePhone(e) {
        setPhone(e.target.value);
        setIsFormDirty(true);
    }

    // Validation function for email format
    function validateEmail(email) {
        return emailRegex.test(email);
    }

    // Form submission handler
    function handleSubmit(e) {
        e.preventDefault();
        // Basic input validation
        if (!name || !email || !address || !phone) {
            alert("Please fill in all the fields.");
            return;
        }
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (phone.length !== 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // Generate a random user ID
        const userId = generateUserId();

        // Construct user data object
        const userData = { name, email, address, phone, userId };

        // Save data to local storage
        localStorage.setItem('userData', JSON.stringify(userData));

        // Display success message
        alert('Form submitted successfully!');

        // Reset form fields
        formRef.current.reset();

        // Inform users about data storage practices
        console.log("User data has been saved to local storage.");

        // Reset form dirty state
        setIsFormDirty(false);
    }

    // Generate user ID function
    function generateUserId() {
        return '_' + Math.random().toString(36).substr(2, 9); // Generate a random string for user ID
    };

    // Effect hook for handling unsaved changes warning
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isFormDirty) {
                event.preventDefault();
                event.returnValue = ''; // Required for Chrome
                return ''; // Required for other browsers
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isFormDirty]);

    return (
        <div className='container'>
            <div className="form-container">
                <div className="form-header">
                    <h2>User Data Form</h2>
                </div>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" onChange={handleName} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" onChange={handleAddress} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" onChange={handleEmail} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" id="phone" name="phone" onChange={handlePhone} />
                    </div>
                    <div className="form-field">
                        <button type="submit" className="submit-btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserDataForm;
