$(document).ready(function(){

    $.getJSON("task9.json", function(formJSON){

        const form = $("<form></form>");

        formJSON.fields.forEach(field => {

            const group = $("<div class='form-group'></div>");
            group.append(`<label>${field.label}</label>`);

            let input;

            if(field.type === "select"){
                input = $(`<select id="${field.id}">
                            <option value="">Select</option>
                          </select>`);

                if(field.options){
                    field.options.forEach(opt => {
                        input.append(`<option value="${opt}">${opt}</option>`);
                    });
                }

            } else {
                input = $(`<input type="${field.type}" id="${field.id}" />`);
            }

            group.append(input);
            group.append(`<div class="error" id="${field.id}-error"></div>`);

            form.append(group);
        });

        form.append(`<button type="submit">Submit</button>`);
        $("#dynamicForm").append(form);

        $("#state").parent().hide();


        $(document).on("change", "#country", function(){

            const selectedCountry = $(this).val();
            const stateSelect = $("#state");

            stateSelect.empty();
            stateSelect.append(`<option value="">Select State</option>`);

            if(formJSON.statesByCountry[selectedCountry]){
                formJSON.statesByCountry[selectedCountry].forEach(function(state){
                    stateSelect.append(`<option value="${state}">${state}</option>`);
                });

                $("#state").parent().show();
            } else {
                $("#state").parent().hide();
            }
        });

        function validateField(id){

            const value = $("#" + id).val();
            const errorDiv = $("#" + id + "-error");

            errorDiv.text("");

            switch(id){

                case "name":
                    if(!value){
                        errorDiv.text("Name is required.");
                        return false;
                    }
                    if(!/^[A-Za-z ]+$/.test(value)){
                        errorDiv.text("Only alphabets allowed.");
                        return false;
                    }
                    break;

                case "email":
                    if(!value){
                        errorDiv.text("Email is required.");
                        return false;
                    }
                    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
                        errorDiv.text("Invalid email format.");
                        return false;
                    }
                    break;

                case "password":
                    if(!value){
                        errorDiv.text("Password is required.");
                        return false;
                    }
                    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value)){
                        errorDiv.text("8+ chars with uppercase, lowercase, number & special char.");
                        return false;
                    }
                    break;

                case "dob":
                    if(!value){
                        errorDiv.text("Date of Birth is required.");
                        return false;
                    }

                    const birthDate = new Date(value);
                    const today = new Date();
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const m = today.getMonth() - birthDate.getMonth();

                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }

                    if(age < 18){
                        errorDiv.text("Must be at least 18 years old.");
                        return false;
                    }
                    break;

                case "phone":
                    if(!value){
                        errorDiv.text("Phone number is required.");
                        return false;
                    }
                    if(!/^\d{10}$/.test(value)){
                        errorDiv.text("Phone must be exactly 10 digits.");
                        return false;
                    }
                    break;

                case "country":
                    if(!value){
                        errorDiv.text("Please select a country.");
                        return false;
                    }
                    break;

                case "state":
                    if($("#state").is(":visible") && !value){
                        errorDiv.text("Please select a state.");
                        return false;
                    }
                    break;
            }

            return true;
        }

        $(document).on("input change", "input, select", function(){
            const fieldId = $(this).attr("id");
            validateField(fieldId);
        });

        form.submit(function(e){
            e.preventDefault();

            let isValid = true;
            let firstInvalid = null;

            formJSON.fields.forEach(field => {

                if(field.required){

                    if(!validateField(field.id)){
                        isValid = false;

                        if(!firstInvalid){
                            firstInvalid = field.id;
                        }
                    }
                }
            });

            if(!isValid){
                alert("Please fix the errors before submitting.");

                if(firstInvalid){
                    $("#" + firstInvalid).focus();
                }

                return;
            }

            alert("Form Submitted Successfully!");
        });

    });

});