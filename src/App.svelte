<script>
	import Header from './UI/Header.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
	import TextInput from './UI/TextInput.svelte';

	let title = '';
	let subtitle = '';
	let description = '';
	let address = '';
	let email = '';
	let imageUrl = '';

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
			contactEmail: "code@test.com"
		},
		{
			id: "m2",
			title: "Swim Together",
			subtitle: "Let's go for some swimming",
			description: "We will simply swim some rounds!",
			imageUrl:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg",
			address: "27th Nerd Road, 32523 New York",
			contactEmail: "swim@test.com"
		}
	];

	function addMeetup(){

		const newMeetup = {
			id: Math.random().toString(),
			title: title,
			subtitle: subtitle,
			address: address,
			description: description,
			imageUrl: imageUrl,
			contactEmail: email
		}

		meetups = [...meetups,newMeetup];
	}

</script>

<main>
	<Header/>

	<form on:submit|preventDefault={addMeetup}>

		<TextInput id="title" type="text" label="Title" value="{title}"
				   on:input={(event) => {title = event.target.value}}/>

		<TextInput id="subtitle" label="Sub title" type="text" value="{subtitle}"
				   on:input={(event) => {subtitle = event.target.value}}/>

		<TextInput id="address" label="Address" type="text" value="{address}"
				   on:input={(event) => {address = event.target.value}}/>

		<TextInput id="imageUrl" label="Image URL" type="text" value="{imageUrl}"
				   on:input={(event) => {imageUrl = event.target.value}}/>

		<TextInput id="email" label="Email" type="email" value="{email}"
				   on:input={(event) => {email = event.target.value}}/>

		<TextInput controlType="textarea" id="description" label="Description"
				   value="{description}" on:input={(event) => {description = event.target.value}}/>

		<button type="submit">Save</button>
	</form>

	<MeetupGrid meetups="{meetups}"/>
</main>

<style>
	main {
		margin-top: 5rem;
	}
	form {
		width: 30rem;
		max-width: 90%;
		margin: auto;
	}
</style>