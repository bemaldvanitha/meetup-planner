<script>
    import { createEventDispatcher } from 'svelte';

    import TextInput from '../UI/TextInput.svelte';
    import Button from '../UI/Button.svelte';

    const dispatch = createEventDispatcher();

    let title = '';
    let subtitle = '';
    let description = '';
    let address = '';
    let email = '';
    let imageUrl = '';

    function submitForm(){
        dispatch('save',{
            title: title,
            subtitle: subtitle,
            description: description,
            address: address,
            email: email,
            imageUrl: imageUrl
        });
    }

</script>

<form on:submit|preventDefault={submitForm}>

    <TextInput id="title" label="Title" value="{title}"
               on:input={(event) => {title = event.target.value}}/>

    <TextInput id="subtitle" label="Sub title" value="{subtitle}"
               on:input={(event) => {subtitle = event.target.value}}/>

    <TextInput id="address" label="Address" value="{address}"
               on:input={(event) => {address = event.target.value}}/>

    <TextInput id="imageUrl" label="Image URL" value="{imageUrl}"
               on:input={(event) => {imageUrl = event.target.value}}/>

    <TextInput id="email" label="Email" type="email" value="{email}"
               on:input={(event) => {email = event.target.value}}/>

    <TextInput controlType="textarea" id="description" label="Description"
               value="{description}" on:input={(event) => {description = event.target.value}}/>

    <Button type="submit" caption="Save"/>
</form>

<style>
    form {
        width: 30rem;
        max-width: 90%;
        margin: auto;
    }
</style>