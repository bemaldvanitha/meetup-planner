<script>
    import { createEventDispatcher } from 'svelte';

    import meetups from './meetups-store';
    import Button from '../UI/Button.svelte';
    import Badge from '../UI/Badge.svelte';

    export let id;
    export let title;
    export let subtitle;
    export let imageUrl;
    export let description;
    export let address;
    //export let email;
    export let isFav;

    const dispatch = createEventDispatcher();

    function toggleFavorite(){

        fetch(`https://meetus-a9eb1-default-rtdb.firebaseio.com/meetups/${id}.json`,{

            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isFavorite: !isFav
            })

        }).then(res => {

            if(!res.ok){
                throw new Error('could not set as favorite');
            }
            meetups.toggleFavorite(id);

        }).catch(err => {
            console.log(err);
        })
    }

</script>

<article>
    <header>
        <h1 class:is-favorite="{isFav}">
            {title}
            {#if isFav}
                <Badge>FAVORITE</Badge>
            {/if}
        </h1>
        <h2>{subtitle}</h2>
        <p>{address}</p>
    </header>
    <div class="image">
        <img src="{imageUrl}" alt="{title}">
    </div>
    <div class="content">
        <p>{description}</p>
    </div>
    <footer>
        <Button mode="outline" type="button" on:click={() => dispatch('edit',id)}>Edit Meetup</Button>
        <Button type="button" mode="outline" on:click={toggleFavorite}
                color="{isFav ? null : 'success' }">
            {isFav ? 'UnFavorite' : 'Favorite'}
        </Button>
        <Button type="button" on:click={() => dispatch('showdetails',id)}>Show Detail</Button>
    </footer>
</article>

<style>
    article {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: 5px;
        background: white;
        margin: 1rem;
    }

    header,
    .content,
    footer {
        padding: 1rem;
    }

    .image {
        width: 100%;
        height: 14rem;
    }

    .image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h1 {
        font-size: 1.25rem;
        margin: 0.5rem 0;
        font-family: "Roboto Slab", sans-serif;
    }

    h1.is-favorite {
        background: #01a129;
        color: white;
        padding: 0 0.5rem;
        border-radius: 5px;
    }

    h2 {
        font-size: 1rem;
        color: #808080;
        margin: 0.5rem 0;
    }

    p {
        font-size: 1.25rem;
        margin: 0;
    }

    div {
        text-align: right;
    }

    .content {
        height: 4rem;
    }
</style>