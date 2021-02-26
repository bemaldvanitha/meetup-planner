<script>
    import { createEventDispatcher } from 'svelte';

    import meetups from './meetups-store';

    import TextInput from '../UI/TextInput.svelte';
    import Button from '../UI/Button.svelte';
    import Modal from '../UI/Modal.svelte';
    import { isEmpty, isLongerThan, isEmailValid, isImageUrl } from '../../helpers/validation';

    const dispatch = createEventDispatcher();

    export let id = null;

    let title = '';
    let subtitle = '';
    let description = '';
    let address = '';
    let email = '';
    let imageUrl = '';
    let formIsValid = false;

    if(id){
        const unsubscribe = meetups.subscribe((items) => {
            const editingMeetup = items.find(item => item.id === id);

            title = editingMeetup.title;
            subtitle = editingMeetup.subtitle;
            description = editingMeetup.description;
            address = editingMeetup.address;
            email = editingMeetup.contactEmail;
            imageUrl = editingMeetup.imageUrl;
        });
        unsubscribe();
    }

    $: titleValid = !isEmpty(title);
    $: subtitleValid = !isEmpty(subtitle);
    $: descriptionValid = isLongerThan(description,5);
    $: emailValid =  isEmailValid(email);
    $: addressValid = isLongerThan(address,7);
    $: imageUrlValid = isImageUrl(imageUrl);
    $: formIsValid = titleValid && subtitleValid && descriptionValid
        && emailValid && addressValid && imageUrlValid

    function submitForm(){

        const meetupData = {
            title: title,
            subtitle: subtitle,
            address: address,
            description: description,
            imageUrl: imageUrl,
            contactEmail: email,
        }

        if(id){
            meetups.updateMeetups(id,meetupData);
        }else{
            meetups.addMeetup(meetupData);
        }

        dispatch('save');
    }

    function cancel(){
        dispatch('cancel');
    }

    function deleteMeetup(){
        meetups.deleteMeetup(id);
        dispatch('save');
    }

</script>

<Modal title="Edit Meetup Data" on:cancel>
    <form on:submit|preventDefault={submitForm}>

        <TextInput id="title" label="Title" value="{title}"
                   on:input={(event) => {title = event.target.value}}
                   validityMessage="Please enter valid title" valid="{titleValid}"/>

        <TextInput id="subtitle" label="Sub title" value="{subtitle}"
                   on:input={(event) => {subtitle = event.target.value}}
                   validityMessage="Please enter valid subtitle" valid="{subtitleValid}"/>

        <TextInput id="address" label="Address" value="{address}"
                   on:input={(event) => {address = event.target.value}}
                   validityMessage="Please enter valid address" valid="{addressValid}"/>

        <TextInput id="imageUrl" label="Image URL" value="{imageUrl}"
                   on:input={(event) => {imageUrl = event.target.value}}
                   validityMessage="Please enter valid image url" valid="{imageUrlValid}"/>

        <TextInput id="email" label="Email" type="email" value="{email}"
                   on:input={(event) => {email = event.target.value}}
                   validityMessage="Please enter valid email" valid="{emailValid}"/>

        <TextInput controlType="textarea" id="description" label="Description"
                   value="{description}" on:input={(event) => {description = event.target.value}}
                   validityMessage="Please enter valid description" valid="{descriptionValid}"/>

    </form>

    <div slot="footer">
        <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
        <Button type="button" on:click={submitForm} disabled="{!formIsValid}">Save</Button>
        {#if id}
            <Button type="button" on:click={deleteMeetup}>Delete</Button>
        {/if}
    </div>

</Modal>

<style>
    form {
        width: 100%;
    }
</style>