<script>
	import { onMount } from 'svelte';
	import meetups from "./Meetups/meetups-store";

	import MeetupDetail from './Meetups/MeetupDetail.svelte';
	import Header from './UI/Header.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
	import EditMeetup from './Meetups/EditMeetup.svelte';
	import LoadingSpinner from './UI/LoadingSpinner.svelte';

	let editMode;
	let page = 'overview';
	let pageData;
	let editedId;
	let isLoading = true;

	onMount(() => {

		fetch('https://meetus-a9eb1-default-rtdb.firebaseio.com/meetups.json',{
			method: 'GET',
		}).then(res => {

			if(!res.ok){
				throw new Error('Fetching meetup fail');
			}
			return res.json();

		}).then(data => {

			const loadedMeetups = [];
			for(const key in data){
				loadedMeetups.push({
					...data[key],
					id: key
				});
			}
			meetups.setMeetups(loadedMeetups);
			isLoading = false;

		}).catch(err => {
			console.log(err);
			isLoading = false;
		})
	});

	function saveMeetup(){
		editMode = null;
		editedId = null;
	}

	function cancelEdit(){
		editMode = null;
		editedId = null;
	}

	function showDetails(event){
		page = 'details';
		pageData = event.detail;
	}

	function closeDetailPage(event){
		page = "overview";
		pageData = event.detail;
	}

	function startEdit(event){
		editMode = 'edit';
		editedId = event.detail;
	}

</script>

<main>
	<Header/>

	{#if page === 'overview'}

		{#if editMode === 'edit'}
			<EditMeetup on:save={saveMeetup} on:cancel={cancelEdit}
						id="{editedId}"/>
		{/if}

		{#if isLoading}
			<LoadingSpinner/>
		{:else}
			<MeetupGrid meetups="{$meetups}" on:showdetails={showDetails}
						on:edit={startEdit} on:add={() => {editMode = 'edit'}}/>
		{/if}

	{:else }
		<MeetupDetail id="{pageData}" on:close={closeDetailPage}/>
	{/if}

</main>

<style>
	main {
		margin-top: 5rem;
	}
</style>