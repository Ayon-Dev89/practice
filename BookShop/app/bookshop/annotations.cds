using BookShopService as service from '../../srv/schema_srv';
annotate service.Books with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'B_ID',
                Value : B_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'title',
                Value : title,
            },
            {
                $Type : 'UI.DataField',
                Label : 'author_A_ID',
                Value : author_A_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'isbn',
                Value : isbn,
            },
            {
                $Type : 'UI.DataField',
                Label : 'stock',
                Value : stock,
            },
            {
                $Type : 'UI.DataField',
                Label : 'price_code',
                Value : price_code,
            },
            {
                $Type : 'UI.DataField',
                Label : 'discount',
                Value : discount,
            },
            {
                $Type : 'UI.DataField',
                Label : 'publisher_P_ID',
                Value : publisher_P_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Language_code',
                Value : Language_code,
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
            Label : 'B_ID',
            Value : B_ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'title',
            Value : title,
        },
        {
            $Type : 'UI.DataField',
            Label : 'author_A_ID',
            Value : author_A_ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'isbn',
            Value : isbn,
        },
        {
            $Type : 'UI.DataField',
            Label : 'stock',
            Value : stock,
        },
    ],
);

annotate service.Books with {
    author @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Authors',
        Label : 'Authors',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : author_A_ID,
                ValueListProperty : 'A_ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'authorName',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'address',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'pincode',
            },
        ],
    }
};

annotate service.Books with {
    publisher @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Publishers',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : publisher_P_ID,
                ValueListProperty : 'P_ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'location',
            },
        ],
    }
};

