<script>
	import Header from './UI/Header.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';

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

		<div class="form-control">
			<label for="title">Title</label>
			<input type="text" id="title" bind:value={title}/>
		</div>

		<div class="form-control">
			<label for="subtitle">Sub Title</label>
			<input type="text" id="subtitle" bind:value={subtitle}/>
		</div>

		<div class="form-control">
			<label for="address">Address</label>
			<input type="text" id="address" bind:value={address}/>
		</div>

		<div class="form-control">
			<label for="imageURL">Image Url</label>
			<input type="text" id="imageURL" bind:value={imageUrl}/>
		</div>

		<div class="form-control">
			<label for="email">Email</label>
			<input type="email" id="email" bind:value={email}/>
		</div>

		<div class="form-control">
			<label for="description">Description</label>
			<textarea id="description" rows="3" bind:value={description}></textarea>
		</div>

		<button type="submit">Save</button>
	</form>

	<MeetupGrid meetups="{meetups}"/>
</main>

<style>
	main {
		margin-top: 5rem;
	}
</style>