'use strict'

const store = require('../store')
const showListings = require('../templates/all-listing.handlebars')
const oneListing = require('../templates/show-listing.handlebars')
const showAuthListings = require('../templates/signed-in-listings.handlebars')

const successMessage = function (newText) {
  $('.message').text(newText)
  $('.message').removeClass('failure')
  $('.message').addClass('success')
  // $('form').trigger('reset')
}

const failureMessage = function (newText) {
  $('.message').text(newText)
  $('.message').removeClass('success')
  $('.message').addClass('failure')
}

const onCreateListingSuccess = function (data) {
  // console.log(data)
  store.listing = data.listing
  successMessage('Yay, onCreateListing worked! ' + data.listing.listing_name)
  $('form').trigger('reset')
}

const onCreateListingFailure = function () {
  failureMessage('Sorry, something went wrong. Please try again.')
}

const onShowListingSuccess = function (data) {
  // console.log(data.listing)
  successMessage('What a stupendous listing! ' + data.listing.listing_name)
  // $('.listing-show').html(oneListing(event))
  const oneListingHTML = oneListing({listing: data.listing})
  $('.listing-index').html('')
  $('.listing-index').html(oneListingHTML)
  $('.create-rsvp').show()
}

const onShowListingFailure = function () {
  failureMessage('Sorry, something went wrong. Please try again.')
}

const onUpdateSuccess = function (data) {
  console.log(data)
  successMessage('Your listing has been updated!')
}

const onUpdateFailure = function () {
  failureMessage('Sorry, something went wrong. Please try again.')
}

// const onGetListingsSuccess = function (data) {
//   console.log(data)
//   successMessage('Here are your listings ')
// }

const onGetListingsSuccess = (data) => {
  // console.log(‘get data is ‘, data)
  const showListingsHTML = showListings({listings: data.listings})
  $('.listing-index').html('')
  $('.listing-index').html(showListingsHTML)
}

const onGetListingsFailure = function () {
  failureMessage('Sorry, something went wrong. Please try again.')
}

const onGetAuthListingsSuccess = (data) => {
  $('#find-user-listing').hide()
  // console.log(‘get data is ‘, data)
  const showAuthListingsHTML = showAuthListings({listings: data.listings})
  $('.listing-index').html('')
  $('.listing-index').html(showAuthListingsHTML)
}

const onGetAuthListingsFailure = function () {
  failureMessage('Sorry, something went wrong. Please try again.')
}

const onGetUserListingsSuccess = (data) => {
  console.log(data)
  successMessage('Here are your listings!')
  const showListingsHTML = showListings({listings: data.listings})
  $(`.listing-index`).html(showListingsHTML)
}

const onGetUserListingsFailure = function () {
  failureMessage('Sorry, something went wrong. Please try again.')
}

const onDeleteListingSuccess = function () {
  successMessage('Your quote with Id: ' + store.listing_id + ' was destroyed.')
}

const onDeleteListingFailure = function () {
  failureMessage('Sorry, something went wrong. Please try again.')
}

module.exports = {
  onCreateListingSuccess,
  onCreateListingFailure,
  onShowListingSuccess,
  onShowListingFailure,
  onUpdateSuccess,
  onUpdateFailure,
  onGetListingsSuccess,
  onGetListingsFailure,
  onDeleteListingSuccess,
  onDeleteListingFailure,
  onGetUserListingsSuccess,
  onGetUserListingsFailure,
  onGetAuthListingsSuccess,
  onGetAuthListingsFailure
}
