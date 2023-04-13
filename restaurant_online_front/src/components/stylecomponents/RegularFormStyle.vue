<template>
  <slot />
</template>

<style lang="scss">
  .left-column-inputs {
    display: flex;
    flex-direction: column;
  }

  .right-column-inputs {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .form__content {
    display: flex;
    width: 100%;
    padding: 10px;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .form {
    width: 40%;
    border: 1px solid #ccc;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .text-input {
      border-width: thin;
      border-right: none;
      border-left: none;
      border-top: none;
      margin: 10px;
      outline: none
    }
  }

  .form__image {
    width: 100%;
    display: flex;
    margin-bottom: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .form__image img {
    width: 100%;
    height: 100%;
  }

  .form__actions {
    display: flex;
    width: 70%;
    flex-direction: row;
    justify-content: space-evenly;
  }
</style>