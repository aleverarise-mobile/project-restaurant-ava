import React from 'react';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import sliderTemplate from './templates/slider';

export const Restaurant = t.struct({
    name: t.String,
    address: t.String,
    capacity: t.Number,
    description: t.String
});

export const options = {
    fields: {
        name: {
            label: 'Name (*)',
            placeholder: 'Name'
        },
        description: {
            label: 'Address (*)',
            placeholder: 'Address'
        },
        capacity: {
            label: 'Capacity (*)',
            help: 'Capacity in people',
            config: {
                step:1,
                min: 1,
                max: 100
            },
            template: sliderTemplate
        },
        description: {
            label: 'Description (*)',
            placeholder: 'Description',
            multiline: true,
            stylesheet: {
                ...Form.stylesheet,
                textbox:{
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: 75
                    },
                    error: {
                        ...Form.stylesheet.textbox.error,
                        height: 75
                    }
                }
            }
        }
    }
}