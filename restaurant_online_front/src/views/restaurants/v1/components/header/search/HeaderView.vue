<script setup>
  import { useCurrentUserStore } from '../../../../../../stores/users/currentUser';
  import { OwnService } from '../../../../../services/owns/ownService';
  import { useContentsStore } from '../../../../stores/ContentsStore';
  import NavDropDown from '.././NavDropDown.vue';
  import NavLi from '../NavLi.vue';

  const contentsStore = useContentsStore()
  const currentUserStore = useCurrentUserStore()
  const ownService = new OwnService()

  const setContentView = (content) => {
    contentsStore.setContent(content)
  }

  const isUserType = (type) => {
    return ownService.isUserType(type, currentUserStore.user)
  }

  const signOut = async () => {
    await currentUserStore.apiSignOut()
  }
</script>

<template>
  <div class="container rounded bg-dark">
    <div class="row m-3 bg-transparent">
      <ul class="nav nav-pills nav-fill">
        <slot />
      </ul>
    </div>
  </div>
</template>
