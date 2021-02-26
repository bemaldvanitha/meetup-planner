<script>
	import meetups from "./Meetups/meetups-store";

	import MeetupDetail from './Meetups/MeetupDetail.svelte';
	import Header from './UI/Header.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
	import EditMeetup from './Meetups/EditMeetup.svelte';
	import Button from './UI/Button.svelte';

	let editMode;
	let page = 'overview';
	let pageData;

	function addMeetup(){
		editMode = null;
	}

	function cancelEdit(){
		editMode = null;
	}

	function showDetails(event){
		page = 'details';
		pageData = event.detail;
	}

	function closeDetailPage(event){
		page = "overview";
		pageData = event.detail;
	}

</script>

<main>
	<Header/>

	{#if page === 'overview'}

		<div id="meetup-controls">
			<Button on:click={() => editMode = 'add'}>New Meetup</Button>
		</div>
		{#if editMode === 'add'}
			<EditMeetup on:save={addMeetup} on:cancel={cancelEdit}/>
		{/if}
		<MeetupGrid meetups="{$meetups}" on:showdetails={showDetails}/>

	{:else }
		<MeetupDetail id="{pageData}" on:close={closeDetailPage}/>
	{/if}

</main>

<style>
	main {
		margin-top: 5rem;
	}
	#meetup-controls {
		margin: 1rem;
	}
</style>