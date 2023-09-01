<script>
export default {
    name: "Edit",
    data() {
        return {
            index: "",
            tutorial: {
                published: false,
                tutorialTitle: "",
                description: ""
            },
            bool: true,
            tutorials: [],
            i: 0,
            dbLink: this.$baseURL
        }
    },
    methods: {
        displayTutorial(route) {
            this.index = route.params.index;
            console.log(this.index);
            axios.get( this.dbLink + this.index).then((response) => {
                this.tutorial = response.data[0];
                console.log(this.tutorial);
            }).catch((error) => {
                console.log(error);
            });
        },
        getTutorials(){
            axios.get(this.dbLink).then((response) => {
                    localStorage.setItem("tutorials", JSON.stringify(response.data));
                    this.tutorials = response.data;
                    console.log(this.tutorials)
            }).catch((error) => {
                console.log(error);
            });
        }, 
        updateTutorial() {
            if (!this.tutorial.tutorialTitle) {
                return this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter a title!',
                });
            }
            if (!this.tutorial.description) {
                return this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter a description!',
                });
            }
            this.tutorials = JSON.parse(localStorage.getItem("tutorials")) || [];
            if (this.tutorials.some(t => t.tutorialTitle == this.tutorial.tutorialTitle && t.tutorialid != this.index)) {
                return this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Tutorial already exists!',
                });
            }
            else {
                this.$swal({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Tutorial updated!',
                });
                axios.put( this.dbLink + this.index, this.tutorial).then((response) => {
                    this.$swal({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Tutorial updated!',
                    });
                    this.$router.push("/tutorial");
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        deleteTutorial() {
            this.tutorials = JSON.parse(localStorage.getItem("tutorials"));
            this.tutorials.splice(this.index, 1);
            //a sweet alert to determine if the user wants to delete the tutorial
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#198754',
                cancelButtonColor: '#dc3545',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal(
                        'Deleted!',
                        'Your tutorial has been deleted.',
                        'success'
                    )
                    // localStorage.setItem("tutorials", JSON.stringify(this.tutorials));
                    // this.$router.push("/tutorial");
                    axios.delete( this.dbLink + this.index).then((response) => {
                        this.$router.push("/tutorial");
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            })
        }

    },
    mounted() {
        this.getTutorials();
        this.displayTutorial(this.$route);
    },
    created() {
        this.index = this.$route.params.index;
    }
};
</script>

<template>
    <div class="row mx-0 p-0 gap-2">
        <p class="text-center h3 fw-semibold">Update Tutorials</p>
        <div class="form-group mx-0 p-0 form-floating">
            <input v-model="tutorial.tutorialTitle" type="text" class="form-control rounded-5 popper" id="tutorial-title"
                placeholder="">
            <label for="tutorial-title" class="text-success-emphasis fw-semibold">Title</label>
        </div>
        <div class="form-group mx-0 p-0 form-floating">
            <textarea v-model="tutorial.description" id="description" class="form-control rounded-5 popper" rows="40"
                placeholder="" style="min-height: 10rem; max-height: 40rem;"></textarea>
            <label for="description" class="text-success-emphasis fw-semibold">Description</label>
        </div>
        <div class="mx-0 p-0 row justify-content-center align-middle">
            <p class="h5 fw-semibold fst-italic p-0 mx-0 col-5 text-start pb-0 mb-0 mt-1">Published: {{ tutorial.published ?
                "Published" : "Pending" }}
            </p>
            <button class="btn btn-outline-primary rounded-pill col-5 fw-semibold popper-lite"
                @click="tutorial.published = !tutorial.published">{{
                    tutorial.published ? "Remove" : "Publish" }}</button>
        </div>
        <div class="row mx-0 p-0">
            <div class="btn-group col-12 rounded-pill popper ps-0 pe-0">
                <button class="btn text-success-emphasis btn-success rounded-start-pill fw-semibold text-center p-2"
                    @click="updateTutorial()">Update Tutorial</button>
                <button class="btn text-success-emphasis btn-warning rounded-end-pill fw-semibold text-center p-2"
                    @click="deleteTutorial()">Delete Tutorial</button>
            </div>
        </div>
    </div>
</template>