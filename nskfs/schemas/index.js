export const schemaTypes = [
    {
        name: 'bassTournament',
        title: 'Bass Tournament',
        type: 'document',
        fields: [
            {
                name: 'title',
                type: 'string',
                title: 'Title',
                description: 'The title of the bass tournament',
                validation: (Rule) => Rule.required(),
            },
            {
                name: 'date',
                type: 'date',
                title: 'Date',
                description: 'The date of the bass tournament',
                validation: (Rule) => Rule.required(),
            },
            {
                name: 'location',
                type: 'string',
                title: 'Location',
                description: 'The location of the bass tournament',
                validation: (Rule) => Rule.required(),
            },
            {
                name: 'info',
                type: 'text',
                title: 'Information',
                description: 'A description of the bass tournament',
                validation: (Rule) => Rule.required(),
            },
            {
                name: 'entryFee',
                type: 'number',
                title: 'Entry Fee',
                description: 'The cost to enter the tournament',
                validation: (Rule) => Rule.required(),
            },
            {
                name: 'lunkerPool',
                type: 'number',
                title: 'Lunker Pool',
                description: 'The cost of the lunker pool',

            },
            {
                name: 'image',
                type: 'image',
                title: 'Image',
                description: 'The image associated with the bass tournament',
                validation: (Rule) => Rule.required(),
            },
            {
                name: 'signup',
                type: 'url',
                title: 'Sign Up Link',
                description: 'Link the TourneyX sign up page',
                // validation: (Rule) => Rule.required(),
            },
            {
                name: 'results',
                type: 'url',
                title: 'Final Leaderboard',
                description: 'Link the TourneyX final leaderboard',
                // validation: (Rule) => Rule.required(),
            },




        ],
    },
    {
        name: 'news',
        title: 'News',
        type: 'document',
        fields: [
            {
                name: 'title',
                type: 'string',
                title: 'Title',
                description: 'The title of the news',
                validation: (Rule) => Rule.required(),
            },
            {
                name: 'date',
                type: 'date',
                title: 'Date',
                description: 'The date of the news being entered',
                validation: (Rule) => Rule.required(),
            },
            {
                name: 'news',
                type: 'text',
                title: 'News',
                description: 'The news',

                validation: (Rule) => Rule.required(),
            },
            {
                name: 'image',
                type: 'image',
                title: 'Image',
                description: 'The image associated with the bass tournament',
                // validation: (Rule) => Rule.required(),
            },

        ],
    },
];


