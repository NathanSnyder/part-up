/**
 * Base Network schema
 * @name networkBaseSchema
 * @memberOf partup.schemas
 * @private
 */
var networkBaseSchema = new SimpleSchema({
    description: {
        type: String,
        max: 250
    },
    location: {
        type: Object,
        optional: true
    },
    'location.city': {
        type: String
    },
    'location.country': {
        type: String
    },
    image: {
        type: String,
        optional: true
    },
    name: {
        type: String,
        max: 150
    },
    tags: {
        type: [String],
        minCount: 1
    },
    website: {
        type: String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.simpleSchemaUrlWithoutProtocol
    }
});

/**
 * Network entity schema
 * @name network
 * @memberOf partup.schemas.entities
 */
Partup.schemas.entities.network = new SimpleSchema([networkBaseSchema, {
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    access_level: {
        type: Number,
        min: 1,
        max: 3
    },
    admin_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    created_at: {
        type: Date,
        defaultValue: new Date()
    },
    invited_uppers: {
        type: [Object],
        optional: true
    },
    'invited_uppers._id': {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    'invited_uppers.invited_by': {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    partups: {
        type: [String],
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    pending_uppers: {
        type: [String],
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    updated_at: {
        type: Date,
        defaultValue: new Date()
    },
    uppers: {
        type: [String],
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    }
}]);

/**
 * network form schema
 * @name network
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.network = new SimpleSchema([networkBaseSchema, {
    //
}]);
