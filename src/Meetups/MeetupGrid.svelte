<script>
    import MeetupItem from './MeetupItem.svelte';
    import MeetupFilter from './MeetupFilter.svelte';

    export let meetups;
    let favOnly = false;

    $: filteredMeetups = favOnly ? meetups.filter(meetup => meetup.isFavorite) : meetups;

    function setFilter(event){
        if(event.detail === 1){
            favOnly = true;
        }else{
            favOnly = false;
        }
    }

</script>

<section id="meetup-control">
    <MeetupFilter on:select={setFilter}/>

    <section id="meetups">

        {#each filteredMeetups as meetup}
            <MeetupItem id="{meetup.id}" title="{meetup.title}" subtitle="{meetup.subtitle}"
                        imageUrl="{meetup.imageUrl}" description="{meetup.description}"
                        address="{meetup.address}" email="{meetup.contactEmail}"
                        isFav="{meetup.isFavorite}" on:showdetails on:edit/>
        {/each}
    </section>
</section>

<style>
    #meetups {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    @media (min-width: 768px) {
        #meetups {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    #meetup-controls {
        margin: 1rem;
    }
</style>