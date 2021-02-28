import { writable } from 'svelte/store';

const meetups = writable([]);

const customMeetupsStore = {
    subscribe: meetups.subscribe,
    setMeetups: (meetupArray) => {

        meetups.set(meetupArray);

    },
    addMeetup: (meetupData) => {

        const newMeetup = {
            ...meetupData,
            id: Math.random().toString(),
        };

        meetups.update(items => {
            return [newMeetup, ...items];
        });

    },
    toggleFavorite: (id) => {

        meetups.update(items => {
            const updatedMeetup = items.find(meetup => meetup.id === id);
            const meetupIndex = items.findIndex(meetup => meetup.id === id);

            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;

            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        });

    },
    updateMeetups: (id,meetupDate) => {
        meetups.update(items => {
           const meetupIndex = items.findIndex(item => item.id === id);

           const updatedMeetup = {...items[meetupIndex], ...meetupDate};
           const updatedMeetups = [...items];
           updatedMeetups[meetupIndex] = updatedMeetup;

           return updatedMeetups;
        });
    },
    deleteMeetup: (id) => {
        meetups.update(items => {
            return items.filter(item => item.id !== id);
        })
    }
};

export default customMeetupsStore;