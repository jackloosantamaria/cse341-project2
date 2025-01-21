const validateData = (body, rules) =>{
    const errors = {};
    let isValid = true;

    Object.keys(rules).forEach((field) =>{
        const rule = rules[field];
        let value = body[field];

        if (value && typeof value !== 'string') {
            value = String(value);
        }

        if (rule.includes('required') && (!value || value.trim() === '')) {
            isValid = false;
            errors[field] = `${field} is required.`;
        }

        if (rule.includes('email') && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
            isValid = false;
            errors[field] = `${field} must be a valid email.`;
        }

        if (rule.includes('date') && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            isValid = false;
            errors[field] = `${field} must be a valid date (YYYY-MM-DD).`;
        }

        if (rule.includes('number') && value && isNaN(value)) {
            isValid = false;
            errors[field] = `${field} must be a valid number.`;
        }
    });

    return {isValid, errors};
};

module.exports = validateData;