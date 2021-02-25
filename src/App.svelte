<script>
	import Header from './UI/Header.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
	import EditMeetup from './Meetups/EditMeetup.svelte';
	import Button from './UI/Button.svelte';

	let editMode;

	let meetups = [
		{
			id: "m1",
			title: "Coding Bootcamp",
			subtitle: "Learn to code in 2 hours",
			description:
					"In this meetup, we will have some experts that teach you how to code!",
			imageUrl:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG",
			address: "27th Nerd Road, 32523 New York",
			contactEmail: "code@test.com",
			isFavorite: false
		},
		{
			id: "m2",
			title: "Swim Together",
			subtitle: "Let's go for some swimming",
			description: "We will simply swim some rounds!",
			imageUrl:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg",
			address: "27th Nerd Road, 32523 New York",
			contactEmail: "swim@test.com",
			isFavorite: false,
		}
	];

	function addMeetup(event){

		const newMeetup = {
			id: Math.random().toString(),
			title: event.detail.title,
			subtitle: event.detail.subtitle,
			address: event.detail.address,
			description: event.detail.description,
			imageUrl: event.detail.imageUrl,
			contactEmail: event.detail.email,
			isFavorite: false,
		}

		meetups = [...meetups,newMeetup];
		editMode = null;
	}

	function toggleFavorite(event){
		const id = event.detail;
		const updatedMeetup = meetups.find(meetup => meetup.id === id);
		const meetupIndex = meetups.findIndex(meetup => meetup.id === id);

		updatedMeetup.isFavorite = !updatedMeetup.isFavorite;

		const updatedMeetups = [...meetups];
		updatedMeetups[meetupIndex] = updatedMeetup;
		meetups = updatedMeetups;
	}

	function cancelEdit(){
		editMode = null;
	}

</script>

<main>
	<Header/>

	<div id="meetup-controls">
		<Button on:click={() => editMode = 'add'}>New Meetup</Button>
	</div>

	{#if editMode === 'add'}
		<EditMeetup on:save={addMeetup} on:cancel={cancelEdit}/>
	{/if}

	<MeetupGrid meetups="{meetups}" on:togglefavorite={toggleFavorite}/>

</main>

<style>
	main {
		margin-top: 5rem;
	}
	#meetup-controls {
		margin: 1rem;
	}
</style>