using SchoolService as service from '../../srv/school_srv';
annotate service.Students with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'first_name',
                Value : first_name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'last_name',
                Value : last_name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Age',
                Value : Age,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Class',
                Value : Class,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Roll_No',
                Value : Roll_No,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Contact',
                Value : Contact,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Email',
                Value : Email,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Address',
                Value : Address,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'first_name',
            Value : first_name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'last_name',
            Value : last_name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Age',
            Value : Age,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Class',
            Value : Class,
        },
    ],
);

