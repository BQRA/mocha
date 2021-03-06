Vue.component('add-section-modal', {
	template: '\
		<div class="add-section-modal">\
			<button class="close" @click="closeModal">close</button>\
			<span><small>SIRA</small>#{{orderCount + 2}}</span>\
			<input ref="input" type="text" placeholder="Ekleyeceğiniz alanın adını giriniz" @keyup.enter="addNewSection" />\
		</div>\
	',
	props: ['orderCount'],
	methods: {
		addNewSection: function() {
			var newSection = { name: this.$refs.input.value, subtitles: [] };
			vm.sections.splice((this.orderCount + 1), 0, newSection);
			vm.modalShow = false;
		},
		closeModal: function() {
			vm.modalShow = false;
		}
	}
})


var descAddingShow = { descriptionAddingShow: false } ;
Vue.component('add-description-button', {
	template: '\
		<div class="add-description">\
			<button :order="order" :porder="porder" @click="openDescAdding(order, porder)">+</button>\
		</div>\
		',
	props: ['order', 'porder'],
	methods: {
		openDescAdding: function(order, porder) {
			return vm.activeDesc = order + '' + porder;
		}
	}
})



Vue.component('add-section-button', {
	template: '\
		<div class="add-section">\
			<button :order="order" @click="openModal(order)">+</button>\
		</div>',
	props: ['order'],
	methods: {
		openModal: function(order) {
			vm.modalShow = true;
			vm.sectionOrder = order;
		}
	}
})



Vue.component('add-description-panel', {
	template: '\
	<div class="description adding" :class="classname">\
		<input v-model="name" type="text" placeholder="Başlık ekle" class="h3">\
		<textarea v-model="description" name="" id="" cols="" rows="" placeholder="Alt başlık, Açıklama, Etiket veya Konu giriniz"></textarea>\
		<button @click="addDescription(this.indexa, this.indexb)">gonder</button>\
	</div>\
	',
	props: ['classname', 'indexa', 'indexb'],
	data: function() {
		return {
			name: '',
			description: ''
		}
	},
	methods: {
		addDescription: function() {
			var newSection = { name: this.name, description: this.description };
			vm.sections[this.indexa].subtitles.splice((this.indexb + 1), 0, newSection);
			vm.activeDesc = -1;
			console.log(this.indexa, this.indexb);
		}
	}
})



var vm = new Vue({
	el: '#app',
	data: {
		modalShow: false,
		activeDesc: -1,
		sectionOrder: '',
		sections: [
			{ 
				name: 'Projeler',
				subtitles: [
					{ 
						name: '2015',
						description: '# [Boxx](http://google.com) \n ## Front-End Developer \n Boxx, GitHub üzerinden *GPL lisansi* altinda kodlarina ulasabileceginiz, **html5** ve **javascript** tabanlı bir oyun projesidir. \n\n `Sketch` `CSS` `HTML` \n ### Sketch'
					},
					{ 
						name: '2014',
						description: '2lorem ipsum dolor sit amet'
					},
					{ 
						name: '2014',
						description: '2lorem ipsum dolor sit amet'
					}
				]
			},
			{ 
				name: 'Is Deneyimleri',
				subtitles: [
					{ 
						name: '2015',
						description: '3lorsas a sem ipsum dolor sit amet'
					},
					{ 
						name: '20s a14',
						description: '4lorem ipssadum dolor sit amet'
					}
				]
			},
			{ 
				name: 'Projeler',
				subtitles: [
					{ 
						name: '2015',
						description: '5lorem **bora ipsum dolor sasit amet'
					},
					{ 
						name: '2014',
						description: '6lorem ipsum doldaor sit amet'
					}
				]
			}	,
			{ 
				name: 'Hooop',
				subtitles: [
					{ 
						name: '2015',
						description: '5lorem **bora ipsum dolor sasit amet'
					},
					{ 
						name: '2014',
						description: '6lorem ipsum doldaor sit amet'
					}
				]
			}			
		]
	},
	methods: {
		
	},
	computed: {
		regexDesc: function () {
			return this.sections.map( function(section, i) {
				return section.subtitles.map(function(subtitle, ind) {
					return marked(subtitle.description, {
						gfm: true,
						tables: false,
						breaks: true,
						sanitize: true
					})
				});
			});
		},

		totalSection: function() {
			return this.sections.length
		}

	}
})



