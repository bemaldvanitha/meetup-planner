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
	let editedId;

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
		<MeetupGrid meetups="{$meetups}" on:showdetails={showDetails}
					on:edit={startEdit} on:add={() => {editMode = 'edit'}}/>

	{:else }
		<MeetupDetail id="{pageData}" on:close={closeDetailPage}/>
	{/if}

</main>

<style>
	main {
		margin-top: 5rem;
	}
</style>