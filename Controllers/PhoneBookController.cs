namespace TechTest.PhoneBook.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using TechTest.PhoneBook.Models;
    using TechTest.PhoneBook.Repositories;
    using TechTest.PhoneBook.Properties;

    [ApiController]
    [Route("[controller]")]
    public class PhoneBookController : ControllerBase
    {
        #region Fields

        /// <summary>
        /// The logger to use.
        /// </summary>
        private readonly ILogger<PhoneBookController> logger;

        /// <summary>
        /// The phone data repository to use.
        /// </summary>
        private readonly IPhoneDataRepository phoneDataRepository;

        #endregion Fields

        #region Constructors

        /// <summary>
        /// Initialises a new instance of the <see cref="PhoneBookController"/> class.
        /// </summary>
        /// <param name="logger">The  <see cref="ILogger"/> to use.</param>
        /// <param name="phoneDataRepository">The <see cref="IPhoneDataRepository"/> to use.</param>
        /// <exception cref="ArgumentNullException"></exception>
        public PhoneBookController(ILogger<PhoneBookController> logger, IPhoneDataRepository phoneDataRepository)
        {
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
            this.phoneDataRepository = phoneDataRepository ?? throw new ArgumentNullException(nameof(phoneDataRepository));
        }

        #endregion Constructors

        #region Public methods

        /// <summary>
        /// Returns a collection of phone book data.
        /// </summary>
        /// <param name="lastNameFilter">The last name to filter the results by.</param>
        /// <returns>A collection of phone book results as a <see cref="PhoneBookItem"/>.</returns>
        [HttpGet]
        public IEnumerable<PhoneBookItem> Read(string? lastNameFilter)
        {
            IEnumerable<PhoneBookItem> data = this.phoneDataRepository.Read(lastNameFilter);

            return data;
        }

        /// <summary>
        /// Creates a phone book entry.
        /// </summary>
        /// <param name="item">The phone book item to create.</param>
        /// <returns>The item created.</returns>
        /// <exception cref="BadHttpRequestException">When the <paramref name="item"/> contains invalid data.</exception>
        [HttpPost]
        public PhoneBookItem Create(PhoneBookItem item)
        {
            if (this.ModelState.IsValid)
            {
                item = this.phoneDataRepository.Create(item);
                return item;
            }
            else
            {
                throw new BadHttpRequestException(Resource.BadRequestError);
            }
        }

        /// <summary>
        /// Deletes a phone book entry.
        /// </summary>
        /// <param name="item">The phone book item to delete.</param>
        /// <returns>The item created.</returns>
        /// <exception cref="BadHttpRequestException">When the <paramref name="item"/> contains invalid data.</exception>
        [HttpDelete]
        public PhoneBookItem Delete(PhoneBookItem item)
        {
            if (this.ModelState.IsValid)
            {
                this.phoneDataRepository.Delete(item);
                return item;
            }
            else
            {
                throw new BadHttpRequestException(Resource.BadRequestError);
            }
        }

        /// <summary>
        /// Updates a phone book entry.
        /// </summary>
        /// <param name="item">The phone book item to update.</param>
        /// <returns>The item created.</returns>
        /// <exception cref="BadHttpRequestException">When the <paramref name="item"/> contains invalid data.</exception>
        [HttpPatch]
        public PhoneBookItem Update(PhoneBookItem item)
        {
            if (this.ModelState.IsValid)
            {
                this.phoneDataRepository.Update(item);
                return item;
            }
            else
            {
                throw new BadHttpRequestException(Resource.BadRequestError);
            }
        }

        #endregion Public methods
    }
}